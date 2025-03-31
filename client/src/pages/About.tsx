import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Heart, 
  Shield, 
  BookOpen,
  MessageSquare, 
  Award, 
  Users, 
  Mail, 
  HelpCircle,
  ExternalLink
} from "lucide-react";
import Logo from "@/components/ui/logo";

const About: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          <span className="text-primary neon-text">About</span> Kingdom Kids
        </h1>
        <p className="text-muted-foreground">
          Learn about our mission, values, and how we're helping Christian families
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 flex flex-col items-center">
              <Logo size="large" />
              <div className="max-w-md mt-6 p-6 border border-primary/40 rounded-md bg-primary/5 neon-border shadow-lg">
                <p className="text-center text-sm scripture-heading leading-relaxed text-foreground">
                  <span className="font-bold text-primary neon-text">Because you dwell in the secret place of the Most High,</span><br/>
                  you shall abide under the shadow of the Almighty.<br/>
                  I will say of the Lord, He is your refuge and your fortress,<br/>
                  your God, in Him shall you trust all the days of your life.<br/>
                  Surely, He shall deliver you from the snare of the fowler<br/>
                  and from the noisome pestilence.<br/>
                  <span className="font-bold text-primary neon-text">You are always safe, always blessed,</span><br/>
                  always the head and not the tail, more than a conqueror.<br/>
                  You walk like, talk like, and act like Jesus.<br/>
                  You are show stock, offspring of God our Father.<br/>
                  You shall live to be 120 years old, full of God,<br/>
                  full of grace, full of all that you need<br/>
                  spirit, body, and soul,<br/>
                  <span className="font-bold text-primary neon-text">in the Name of Jesus Christ, your Lord and Savior!</span>
                </p>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4 font-serif italic">
                "Jesus said, 'Let the little children come to me'" - Matthew 19:14
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p>
                Kingdom Kids Secret Place is dedicated to helping Christian parents create a safe 
                and faith-nurturing digital environment for their children. We believe that technology 
                should be a tool to strengthen faith, not undermine it. 
              </p>
              <p>
                Our application combines advanced parental controls with scripture learning features
                to ensure that children can safely navigate the digital world while growing in their
                faith and understanding of biblical principles.
              </p>
              <p>
                We're committed to partnering with parents to raise children who are both digitally
                literate and firmly rooted in Christian values, creating a generation that can bring
                light to the digital world.
              </p>
              
              <div className="pt-4">
                <Link href="/signup">
                  <Button className="mr-4">
                    <Heart className="mr-2 h-4 w-4" />
                    Join Our Community
                  </Button>
                </Link>
                <Button variant="outline" asChild>
                  <a href="#contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Our Core Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/20 p-4 mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Protection</h3>
                <p className="text-muted-foreground">
                  We believe in protecting children from harmful digital content while teaching them discernment.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/20 p-4 mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Biblical Education</h3>
                <p className="text-muted-foreground">
                  We're committed to making Bible study engaging and rewarding for children.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/20 p-4 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Family Partnership</h3>
                <p className="text-muted-foreground">
                  We partner with parents to create a cohesive approach to digital discipleship.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="rounded-full bg-primary/20 p-3 mr-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Advanced Parental Controls</h3>
                  <p className="text-muted-foreground">
                    Monitor gaming content, chat conversations, and online activities to keep your children safe from inappropriate content.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="rounded-full bg-primary/20 p-3 mr-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Scripture Memorization</h3>
                  <p className="text-muted-foreground">
                    Interactive tools to help children memorize Bible verses and earn rewards for their achievements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="rounded-full bg-primary/20 p-3 mr-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Prayer Journal</h3>
                  <p className="text-muted-foreground">
                    Digital prayer journal to help children develop a consistent prayer life and track God's answers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="rounded-full bg-primary/20 p-3 mr-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Faith-Based Rewards System</h3>
                  <p className="text-muted-foreground">
                    Earn extra game time by completing Bible lessons and memorizing scripture verses.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card id="contact">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p>
                We'd love to hear from you! Whether you have questions about our app, 
                need technical support, or want to share your testimonial, our team is here to help.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-2" />
                  <a href="mailto:support@kingdomkids.com" className="hover:text-primary">
                    support@kingdomkids.com
                  </a>
                </div>
                
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-primary mr-2" />
                  <a href="#" className="hover:text-primary">
                    Help Center & FAQs
                  </a>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="font-bold mb-2">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="rounded-full bg-primary/20 p-2 hover:bg-primary/30">
                    <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="rounded-full bg-primary/20 p-2 hover:bg-primary/30">
                    <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="rounded-full bg-primary/20 p-2 hover:bg-primary/30">
                    <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" className="rounded-full bg-primary/20 p-2 hover:bg-primary/30">
                    <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center text-muted-foreground hover:text-primary">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-muted-foreground hover:text-primary">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-muted-foreground hover:text-primary">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-muted-foreground hover:text-primary">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-muted-foreground hover:text-primary">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="border-t pt-8 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Kingdom Kids Secret Place. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default About;
