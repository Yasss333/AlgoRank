import React from "react";
import { Link } from "react-router-dom";
import {
  Code2,
  Zap,
  TrendingUp,
  Users,
  Target,
  Award,
  ChevronRight,
  Sparkles,
  GitBranch,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 navbar bg-base-100/50 backdrop-blur-md shadow-lg border-b border-base-300">
        <div className="flex-1 pl-8">
          <Link to="/" className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AlgoRank
          </Link>
        </div>
        <div className="flex-none gap-2 pr-8">
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="badge badge-lg badge-primary gap-2">
                  <Sparkles className="w-4 h-4" />
                  Master Coding Interviews
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black leading-tight">
                Master Your Coding{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Skills
                </span>
              </h1>
              <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
                AlgoRank is your ultimate platform to prepare for coding interviews and improve your programming skills. Solve challenging problems, track your progress, and compete with other developers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="btn btn-primary btn-lg gap-2 group"
              >
                Get Started
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn btn-outline btn-lg gap-2" >
                <a href="#">Watch demo </a>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-base-content/60">DSA Problems</div>
              </div>
              {/* <div className="space-y-2">
                <div className="text-3xl font-bold text-secondary">10K+</div>
                <div className="text-sm text-base-content/60">Active Users</div>
              </div> */}
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent">98%</div>
                <div className="text-sm text-base-content/60">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-base-100 rounded-3xl p-8 border border-base-300 shadow-2xl">
              <div className="space-y-4">
                <div className="h-3 bg-primary/20 rounded w-3/4"></div>
                <div className="h-3 bg-secondary/20 rounded w-5/6"></div>
                <div className="h-3 bg-accent/20 rounded w-4/5"></div>
                <div className="divider my-4"></div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Code2 className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 h-2 bg-base-300 rounded"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1 h-2 bg-base-300 rounded"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1 h-2 bg-base-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-base-200/50 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose AlgoRank?</h2>
            <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
              Everything you need to succeed in your coding interview journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 hover:border-primary">
              <div className="card-body">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="card-title text-xl">High Value 
                    Problems</h3>
                <p className="text-base-content/60">
                  Carefully curated problems across all difficulty levels covering every DSA topic
                </p>
              </div>
            </div>

            
            {/* Feature 3 */}
            <div className="group card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 hover:border-accent">
              <div className="card-body">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <h3 className="card-title text-xl">Progress Tracking</h3>
                <p className="text-base-content/60">
                  Monitor your improvement with detailed analytics and statistics
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 hover:border-primary">
              <div className="card-body">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="card-title text-xl">Community (upcoming feature)</h3>
                <p className="text-base-content/60">
                Platform inspired by Leetcode/TUF+
                </p>
              </div>
            </div>

            

            {/* Feature 6 */}
            <div className="group card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 hover:border-accent">
              <div className="card-body">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <h3 className="card-title text-xl">Achievements</h3>
                <p className="text-base-content/60">
                  Earn badges and climb the leaderboard as you solve more problems
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl border border-base-300 p-12 text-center space-y-6">
            <h2 className="text-4xl font-bold">Ready to Start Your Journey?</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Join thousands of developers preparing for their dream jobs at top tech companies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn btn-primary btn-lg gap-2">
                Get Started Now
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                Already Have an Account?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-base-300 bg-base-100/50 backdrop-blur py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">AlgoRank</h3>
              <p className="text-sm text-base-content/60">
                Master coding interviews and improve your programming skills
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-base-content/60">
                <li><a href="#" className="hover:text-primary transition">Features</a></li>
                {/* <li><a href="#" className="hover:text-primary transition">Pricing</a></li> */}
                <li><a href="#" className="hover:text-primary transition">Problems</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-base-content/60">
                <li><a href="#" className="hover:text-primary transition">About</a></li>
                <li><a href="#" className="hover:text-primary transition">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-base-content/60">
                <li><a href="#" className="hover:text-primary transition">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-base-300 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-base-content/60">
            <p>&copy; 2026 AlgoRank by Yash Mandhare. All rights reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="https://github.com/Yasss333/AlgoRank" className="hover:text-primary transition">GitHub</a>
              <a href="yash.m.code@gmail.com" className="hover:text-primary transition">Mail</a>
              <a href="https://www.linkedin.com/in/yashmandhare1/" className="hover:text-primary transition">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
