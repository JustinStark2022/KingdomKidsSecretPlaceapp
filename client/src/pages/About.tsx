import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ExternalLink,
  Search,
  LifeBuoy,
  Clock,
  FileQuestion,
  CheckCircle,
  Gamepad2,
  UserPlus
} from "lucide-react";
import Logo from "@/components/ui/logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const About: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          <span className="high-contrast-text text-primary neon-text">About</span> Kingdom Kids
        </h1>
        <p className="text-muted-foreground">
          Help and support resources for the Kingdom Kids Secret Place application
        </p>
      </div>
      
      <Card className="overflow-hidden shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 flex flex-col items-center">
              <Logo size="large" />
              <div className="max-w-md mt-6 p-6 border border-primary/40 rounded-md bg-primary/5 neon-border shadow-lg">
                <p className="text-center text-sm scripture-heading leading-relaxed text-foreground">
                  <span className="font-bold high-contrast-text text-primary neon-text">Because you dwell in the secret place of the Most High,</span><br/>
                  you shall abide under the shadow of the Almighty.<br/>
                  I will say of the Lord, He is your refuge and your fortress,<br/>
                  your God, in Him shall you trust all the days of your life.<br/>
                  Surely, He shall deliver you from the snare of the fowler<br/>
                  and from the noisome pestilence.<br/>
                  <span className="font-bold high-contrast-text text-primary neon-text">You are always safe, always blessed,</span><br/>
                  always the head and not the tail, more than a conqueror.<br/>
                  You walk like, talk like, and act like Jesus.<br/>
                  You are show stock, offspring of God our Father.<br/>
                  You shall live to be 120 years old, full of God,<br/>
                  full of grace, full of all that you need<br/>
                  spirit, body, and soul,<br/>
                  <span className="font-bold high-contrast-text text-primary neon-text">in the Name of Jesus Christ, your Lord and Savior!</span>
                </p>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4 font-serif italic">
                "Jesus said, 'Let the little children come to me'" - Matthew 19:14
              </p>
            </div>
            
            <div className="space-y-4 flex-1">
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

      <div className="pt-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="bg-primary/10 p-2 rounded-full">
            <LifeBuoy className="h-6 w-6 text-primary high-contrast-text" />
          </div>
          <h2 className="text-2xl font-bold">Help & Support</h2>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            className="pl-10 bg-background" 
            placeholder="Search for help topics..."
          />
        </div>

        <Tabs defaultValue="parents" className="space-y-4">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="parents" className="text-base">
              <Shield className="mr-2 h-4 w-4 text-primary high-contrast-text" />
              For Parents
            </TabsTrigger>
            <TabsTrigger value="children" className="text-base">
              <Gamepad2 className="mr-2 h-4 w-4 text-primary high-contrast-text" />
              For Children
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="parents" className="space-y-4">
            <Card className="border border-primary/10">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary high-contrast-text" />
                  <span>Parental Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start h-auto py-3 px-4">
                    <div className="flex gap-3 items-start">
                      <FileQuestion className="h-5 w-5 text-primary high-contrast-text" />
                      <div className="text-left">
                        <p className="font-semibold">Setting Up Game Monitoring</p>
                        <p className="text-xs text-muted-foreground">Learn how to monitor your child's gaming activity</p>
                      </div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-3 px-4">
                    <div className="flex gap-3 items-start">
                      <UserPlus className="h-5 w-5 text-primary high-contrast-text" />
                      <div className="text-left">
                        <p className="font-semibold">Friend Request Approvals</p>
                        <p className="text-xs text-muted-foreground">How to review and manage friend requests</p>
                      </div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-3 px-4">
                    <div className="flex gap-3 items-start">
                      <MessageSquare className="h-5 w-5 text-primary high-contrast-text" />
                      <div className="text-left">
                        <p className="font-semibold">Chat Monitoring</p>
                        <p className="text-xs text-muted-foreground">How to review chat conversations and set limits</p>
                      </div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-3 px-4">
                    <div className="flex gap-3 items-start">
                      <Clock className="h-5 w-5 text-primary high-contrast-text" />
                      <div className="text-left">
                        <p className="font-semibold">Screen Time Management</p>
                        <p className="text-xs text-muted-foreground">Setting healthy limits and reward time</p>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="children" className="space-y-4">
            <Card className="border border-primary/10">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary high-contrast-text" />
                  <span>Biblical Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start h-auto py-3 px-4">
                    <div className="flex gap-3 items-start">
                      <CheckCircle className="h-5 w-5 text-primary high-contrast-text" />
                      <div className="text-left">
                        <p className="font-semibold">Earning Rewards</p>
                        <p className="text-xs text-muted-foreground">How to earn extra game time through Biblical activities</p>
                      </div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-3 px-4">
                    <div className="flex gap-3 items-start">
                      <BookOpen className="h-5 w-5 text-primary high-contrast-text" />
                      <div className="text-left">
                        <p className="font-semibold">Scripture Memorization</p>
                        <p className="text-xs text-muted-foreground">Tips for memorizing Bible verses effectively</p>
                      </div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-3 px-4">
                    <div className="flex gap-3 items-start">
                      <MessageSquare className="h-5 w-5 text-primary high-contrast-text" />
                      <div className="text-left">
                        <p className="font-semibold">Prayer Journal</p>
                        <p className="text-xs text-muted-foreground">How to use your digital prayer journal</p>
                      </div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-3 px-4">
                    <div className="flex gap-3 items-start">
                      <Award className="h-5 w-5 text-primary high-contrast-text" />
                      <div className="text-left">
                        <p className="font-semibold">Bible Quizzes</p>
                        <p className="text-xs text-muted-foreground">How to complete Bible quizzes and earn rewards</p>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="pt-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="bg-primary/10 p-2 rounded-full">
            <Users className="h-6 w-6 text-primary high-contrast-text" />
          </div>
          <h2 className="text-2xl font-bold">Our Core Values</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/20 p-4 mb-4">
                  <Shield className="h-8 w-8 text-primary high-contrast-text" />
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
                  <BookOpen className="h-8 w-8 text-primary high-contrast-text" />
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
                  <Users className="h-8 w-8 text-primary high-contrast-text" />
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
                  <Mail className="h-5 w-5 text-primary high-contrast-text mr-2" />
                  <a href="mailto:support@kingdomkids.com" className="hover:text-primary high-contrast-text">
                    support@kingdomkids.com
                  </a>
                </div>
                
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-primary high-contrast-text mr-2" />
                  <a href="#" className="hover:text-primary">
                    Help Center & FAQs
                  </a>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="font-bold mb-2">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="rounded-full bg-primary/20 p-2 hover:bg-primary/30">
                    <svg className="h-5 w-5 text-primary high-contrast-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="rounded-full bg-primary/20 p-2 hover:bg-primary/30">
                    <svg className="h-5 w-5 text-primary high-contrast-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="rounded-full bg-primary/20 p-2 hover:bg-primary/30">
                    <svg className="h-5 w-5 text-primary high-contrast-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" className="rounded-full bg-primary/20 p-2 hover:bg-primary/30">
                    <svg className="h-5 w-5 text-primary high-contrast-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    <ExternalLink className="h-4 w-4 mr-2 text-primary high-contrast-text" />
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-muted-foreground hover:text-primary">
                    <ExternalLink className="h-4 w-4 mr-2 text-primary high-contrast-text" />
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-muted-foreground hover:text-primary">
                    <ExternalLink className="h-4 w-4 mr-2 text-primary high-contrast-text" />
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-muted-foreground hover:text-primary">
                    <ExternalLink className="h-4 w-4 mr-2 text-primary high-contrast-text" />
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-muted-foreground hover:text-primary">
                    <ExternalLink className="h-4 w-4 mr-2 text-primary high-contrast-text" />
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