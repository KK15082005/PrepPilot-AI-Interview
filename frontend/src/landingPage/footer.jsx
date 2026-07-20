import React from 'react';
import "./footer.css";
function Footer() {
    return (
        <footer className="footer py-5">
            <div className="container">
                <div className="row">   

                {/* Logo */}  
                    <div className="col-lg-4 mb-4">
                        <h3 className="logo">PrepPilot AI</h3>

                        <p className="mt-3">
                            Prepare smarter with AI-powered mock interviews,
                            instant feedback and personalized learning paths.
                            </p>
                    </div>
                    <div className="col-lg-2 col-6 mb-4">
                        <h5>Product</h5>

                        <ul className="list-unstyled">
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Workflow</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="col-lg-2 col-6 mb-4">
                        <h5>Resources</h5>

                        <ul className="list-unstyled">
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Documentation</a></li>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Contact</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="col-lg-2 col-6 mb-4">
                        <h5>Company</h5>

                        <ul className="list-unstyled">
                        <li><a href="#">About</a></li>
                        <li><a href="#">Privacy</a></li>
                        <li><a href="#">Terms</a></li>
                        <li><a href="#">Support</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="col-lg-2 col-6 mb-4">
                        <h5>Follow</h5>

                        <div className="d-flex gap-3 mt-3">
                        <i className="bi bi-linkedin fs-4"></i>
                        <i className="bi bi-github fs-4"></i>
                        <i className="bi bi-twitter-x fs-4"></i>
                        <i className="bi bi-envelope fs-4"></i>
                        </div>
                    </div>

                </div>
                <hr />

                <div className="d-flex justify-content-between flex-wrap">
                    <p>© 2026 PrepPilot AI. All Rights Reserved.</p>

                    <p>Built by ❤️ KAMALJEET KAUR</p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
  