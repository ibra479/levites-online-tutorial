"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

const initialForm = {
  fullName: "",
  gender: "",
  utmeSubjects: "",
  proposedCourse: "",
  proposedInstitution: "",
  targetScore: "300",
  email: "",
};

export default function Home() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Registration failed. Please try again."
        );
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function scrollToForm() {
    document.getElementById("register")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <main>
      {/* ================= NAVBAR ================= */}

      <nav className="navbar">
        <a href="#" className="brand">
          <img
            src="/levites-logo.jpg"
            alt="Levites Online Tutorial"
            className="brand-logo"
          />

          <span className="brand-text">
            <strong>LEVITES</strong>
            <small>ONLINE TUTORIAL</small>
          </span>
        </a>

        <a href="#register" className="nav-link">
          Register Now <span>↗</span>
        </a>
      </nav>

      {/* ================= HERO ================= */}

      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="live-dot" />
            YOUR FUTURE STARTS HERE
          </div>

          <h1>
            Your Journey
            <br />
            To <span>300+</span>
            <br />
            Starts Here.
          </h1>

          <p className="hero-description">
            Your dream course. Your dream university. One goal.
            Prepare for your UTME with Levites Online Tutorial and
            take the next step towards your future.
          </p>

          <div className="hero-actions">
            <button onClick={scrollToForm} className="primary-button">
              Register for Tutorial <span>→</span>
            </button>

            <a href="#why-levites" className="secondary-link">
              Discover Levites ↓
            </a>
          </div>

          <div className="hero-note">
            <span className="note-icon">✦</span>
            Your ambition deserves the right preparation.
          </div>
        </div>

        {/* ================= HERO VISUAL ================= */}

        <div className="hero-visual">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />

          <div className="hero-logo-card">
            <img
              src="/levites-logo.jpg"
              alt="Levites Online Tutorial Logo"
              className="hero-logo"
            />
          </div>

          <div className="score-card">
            <div className="score-card-top">
              <span className="score-label">YOUR TARGET</span>
              <span className="score-star">✦</span>
            </div>

            <div className="score-number">
              300<span>+</span>
            </div>

            <div className="score-divider" />

            <div className="score-bottom">
              <span className="score-check">✓</span>

              <div>
                <strong>Dream big. Prepare smart.</strong>
                <small>
                  Every great journey starts somewhere.
                </small>
              </div>
            </div>
          </div>

          <div className="floating-badge badge-top">
            <span>✦</span> AIM HIGHER
          </div>

          <div className="floating-badge badge-bottom">
            <span>↗</span> FUTURE GRADUATE
          </div>

          <div className="visual-decoration decoration-one" />
          <div className="visual-decoration decoration-two" />
        </div>
      </section>

      {/* ================= BENEFITS ================= */}

      <section className="benefits" id="why-levites">
        <div className="benefit">
          <div className="benefit-icon purple-icon">◎</div>

          <div>
            <h3>Focused Preparation</h3>
            <p>Keep your UTME goals in sight.</p>
          </div>
        </div>

        <div className="benefit">
          <div className="benefit-icon gold-icon">✦</div>

          <div>
            <h3>Big Ambitions</h3>
            <p>Take a confident step towards your dream.</p>
          </div>
        </div>

        <div className="benefit">
          <div className="benefit-icon purple-icon">↗</div>

          <div>
            <h3>Your Next Chapter</h3>
            <p>Start preparing for university life.</p>
          </div>
        </div>
      </section>

      {/* ================= REGISTRATION ================= */}

      <section className="registration-section" id="register">
        <div className="registration-intro">
          <div className="registration-logo">
            <img
              src="/levites-logo.jpg"
              alt="Levites Online Tutorial"
            />
          </div>

          <div className="section-eyebrow">
            TAKE THE FIRST STEP
          </div>

          <h2>
            Let's Get You
            <br />
            <span>Registered.</span>
          </h2>

          <p>
            Tell us a little about yourself and your UTME goals.
            Complete the form carefully to register for Levites
            Online Tutorial.
          </p>

          <div className="registration-promise">
            <span>✓</span>

            <p>
              <strong>Almost there!</strong>
              <br />
              Your journey to 300+ begins with this step.
            </p>
          </div>
        </div>

        {/* ================= FORM CARD ================= */}

        <div className="form-card">
          {submitted ? (
            <div className="success-screen">
              <div className="success-icon">✓</div>

              <div className="section-eyebrow">
                REGISTRATION SUBMITTED
              </div>

              <h2>
                Congratulations<span>!</span> 🎉
              </h2>

              <p className="success-highlight">
                You're on your journey to 300+.
              </p>

              <p className="success-description">
                Your registration has been sent successfully.
                Keep an eye on your email for any follow-up from
                the tutorial administrator.
              </p>

              <div className="success-message">
                <span>✦</span>
                Your dream is worth working for. Keep going!
              </div>

              <button
                type="button"
                className="primary-button full-button"
                onClick={() => {
                  setSubmitted(false);
                  setError("");
                  scrollToForm();
                }}
              >
                Back to Homepage ↑
              </button>
            </div>
          ) : (
            <>
              <div className="form-heading">
                <div>
                  <div className="section-eyebrow">
                    STUDENT REGISTRATION
                  </div>

                  <h2>Registration Form</h2>

                  <p>All fields are required.</p>
                </div>

                <div className="form-number">01</div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* PERSONAL INFORMATION */}

                <div className="form-section-title">
                  <span className="form-section-icon">01</span>
                  Personal Information
                </div>

                <div className="field">
                  <label htmlFor="fullName">Full Name</label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                    minLength={2}
                    maxLength={100}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="email">
                    Active Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    maxLength={254}
                    required
                  />

                  <small>
                    Use an email address you can access.
                  </small>
                </div>

                <div className="field">
                  <label htmlFor="gender">Gender</label>

                  <select
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select your gender
                    </option>

                    <option value="Male">Male</option>

                    <option value="Female">Female</option>

                    <option value="Prefer not to say">
                      Prefer not to say
                    </option>
                  </select>
                </div>

                {/* UTME INFORMATION */}

                <div className="form-section-title second-section">
                  <span className="form-section-icon">02</span>
                  UTME Information
                </div>

                <div className="field">
                  <label htmlFor="utmeSubjects">
                    UTME Subject Combination
                  </label>

                  <input
                    id="utmeSubjects"
                    name="utmeSubjects"
                    type="text"
                    placeholder="e.g. English, Mathematics, Physics, Chemistry"
                    value={form.utmeSubjects}
                    onChange={handleChange}
                    minLength={3}
                    maxLength={200}
                    required
                  />

                  <small>
                    Enter English Language and your three other
                    subjects.
                  </small>
                </div>

                <div className="field">
                  <label htmlFor="proposedCourse">
                    Proposed Course of Study
                  </label>

                  <input
                    id="proposedCourse"
                    name="proposedCourse"
                    type="text"
                    placeholder="e.g. Computer Science"
                    value={form.proposedCourse}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={150}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="proposedInstitution">
                    Proposed Institution of Study
                  </label>

                  <input
                    id="proposedInstitution"
                    name="proposedInstitution"
                    type="text"
                    placeholder="e.g. University of Abuja"
                    value={form.proposedInstitution}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={200}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="targetScore">
                    UTME Target Score
                  </label>

                  <select
                    id="targetScore"
                    name="targetScore"
                    value={form.targetScore}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select your target score
                    </option>

                    <option value="200">200+</option>
                    <option value="250">250+</option>
                    <option value="270">270+</option>
                    <option value="280">280+</option>
                    <option value="300">300+</option>
                    <option value="320">320+</option>
                    <option value="350">350+</option>
                    <option value="380">380+</option>
                  </select>
                </div>

                {/* ERROR */}

                {error && (
                  <div className="error-message" role="alert">
                    <span>!</span>
                    {error}
                  </div>
                )}

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="primary-button full-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner" />
                      Sending Registration...
                    </>
                  ) : (
                    <>
                      Complete Registration <span>→</span>
                    </>
                  )}
                </button>

                <p className="privacy-note">
                  🔒 Your information will be sent securely to the
                  tutorial administrator.
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="footer">
        <div className="footer-brand">
          <span className="footer-brand-name">
            LEVITES
          </span>

          <span className="footer-brand-subtitle">
            ONLINE TUTORIAL
          </span>
        </div>

        <p>
          Prepare with purpose. Pursue your future.
        </p>

        <span className="footer-copy">
          © 2026 Levites Online Tutorial.
        </span>
      </footer>
    </main>
  );
}