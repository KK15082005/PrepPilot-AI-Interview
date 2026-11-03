import React, { useEffect, useRef, useState } from "react";

function AudioWaveform({ isListening }) {
    const BAR_COUNT = 24;
    const [barHeights, setBarHeights] = useState(new Array(BAR_COUNT).fill(6));
    const [hasAudioContext, setHasAudioContext] = useState(false);

    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const streamRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (!isListening) {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
                streamRef.current = null;
            }
            if (audioContextRef.current && audioContextRef.current.state !== "closed") {
                audioContextRef.current.close().catch(() => {});
                audioContextRef.current = null;
            }
            setBarHeights(new Array(BAR_COUNT).fill(6));
            setHasAudioContext(false);
            return;
        }

        let isCancelled = false;

        async function initAudio() {
            try {
                if (!navigator.mediaDevices?.getUserMedia) {
                    return;
                }

                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                if (isCancelled) {
                    stream.getTracks().forEach((track) => track.stop());
                    return;
                }

                streamRef.current = stream;
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (!AudioCtx) return;

                const audioCtx = new AudioCtx();
                audioContextRef.current = audioCtx;

                const analyser = audioCtx.createAnalyser();
                analyser.fftSize = 64; // yields 32 frequency bins
                analyser.smoothingTimeConstant = 0.65;
                analyserRef.current = analyser;

                const source = audioCtx.createMediaStreamSource(stream);
                source.connect(analyser);

                setHasAudioContext(true);

                const dataArray = new Uint8Array(analyser.frequencyBinCount);

                const renderFrame = () => {
                    if (!analyserRef.current || isCancelled) return;
                    analyserRef.current.getByteFrequencyData(dataArray);

                    const step = Math.max(1, Math.floor(dataArray.length / BAR_COUNT));
                    const newHeights = [];

                    for (let i = 0; i < BAR_COUNT; i++) {
                        const val = dataArray[i * step] || 0;
                        // Map 0-255 to 6px - 36px
                        const height = Math.min(36, Math.max(6, Math.round((val / 255) * 36)));
                        newHeights.push(height);
                    }

                    setBarHeights(newHeights);
                    animationFrameRef.current = requestAnimationFrame(renderFrame);
                };

                renderFrame();
            } catch (err) {
                console.warn("Waveform audio visualizer using CSS animation fallback:", err);
                setHasAudioContext(false);
            }
        }

        initAudio();

        return () => {
            isCancelled = true;
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
            if (audioContextRef.current && audioContextRef.current.state !== "closed") {
                audioContextRef.current.close().catch(() => {});
            }
        };
    }, [isListening]);

    if (!isListening) {
        return null;
    }

    return (
        <div
            className="p-3 mb-3 rounded-3 d-flex align-items-center justify-content-between flex-wrap gap-2"
            style={{
                background: "linear-gradient(135deg, #F0FDF4 0%, #E6F8F7 100%)",
                border: "1px solid #A7F3D0",
                boxShadow: "0 4px 12px rgba(15, 157, 154, 0.08)",
                transition: "all 0.3s ease",
            }}
        >
            <div className="d-flex align-items-center gap-2">
                <span
                    className="spinner-grow spinner-grow-sm text-danger"
                    role="status"
                    style={{ width: "10px", height: "10px" }}
                ></span>
                <span className="fw-bold" style={{ color: "#0F766E", fontSize: "13px" }}>
                    LIVE AUDIO STREAM
                </span>
                <span className="text-secondary d-none d-sm-inline" style={{ fontSize: "13px" }}>
                    • Speak your answer naturally into your microphone
                </span>
            </div>

            {/* Visual Equalizer Bars */}
            <div className="d-flex align-items-center gap-1" style={{ height: "36px", minWidth: "120px" }}>
                {barHeights.map((h, i) => (
                    <span
                        key={i}
                        className={`waveform-bar ${!hasAudioContext ? "waveform-bar-animated" : ""}`}
                        style={{
                            height: hasAudioContext ? `${h}px` : undefined,
                            animationDelay: !hasAudioContext ? `${(i * 0.05).toFixed(2)}s` : undefined,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default AudioWaveform;
