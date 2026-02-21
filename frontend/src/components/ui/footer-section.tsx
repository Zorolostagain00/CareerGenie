"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Send, Twitter } from "lucide-react"

function Footerdemo() {
    return (
        <footer className="relative border-t border-slate-200 bg-white text-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Newsletter */}
                    <div className="relative">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">Stay Connected</h2>
                        <p className="mb-6 text-slate-500">
                            Join our newsletter for the latest updates and exclusive offers.
                        </p>
                        <form className="relative" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="pr-12 backdrop-blur-sm"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-indigo-600 text-white transition-transform hover:scale-105 hover:bg-indigo-500"
                            >
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Subscribe</span>
                            </Button>
                        </form>
                        <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-slate-900">Quick Links</h3>
                        <nav className="space-y-2 text-sm">
                            <a href="/" className="block text-slate-600 transition-colors hover:text-indigo-600">
                                Home
                            </a>
                            <a href="/personal-info" className="block text-slate-600 transition-colors hover:text-indigo-600">
                                Assessment
                            </a>
                            <a href="/results" className="block text-slate-600 transition-colors hover:text-indigo-600">
                                Results
                            </a>
                            <a href="/roadmap" className="block text-slate-600 transition-colors hover:text-indigo-600">
                                Career Roadmap
                            </a>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-slate-900">Contact Us</h3>
                        <address className="space-y-2 text-sm not-italic text-slate-600">
                            <p>123 Innovation Street</p>
                            <p>Tech City, TC 12345</p>
                            <p>Phone: (123) 456-7890</p>
                            <p>Email: hello@careergenie.com</p>
                        </address>
                    </div>

                    {/* Social Links */}
                    <div className="relative">
                        <h3 className="mb-4 text-lg font-semibold text-slate-900">Follow Us</h3>
                        <div className="mb-6 flex space-x-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50">
                                            <Facebook className="h-4 w-4" />
                                            <span className="sr-only">Facebook</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Follow us on Facebook</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50">
                                            <Twitter className="h-4 w-4" />
                                            <span className="sr-only">Twitter</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Follow us on Twitter</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50">
                                            <Instagram className="h-4 w-4" />
                                            <span className="sr-only">Instagram</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Follow us on Instagram</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50">
                                            <Linkedin className="h-4 w-4" />
                                            <span className="sr-only">LinkedIn</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Connect with us on LinkedIn</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-center md:flex-row">
                    <p className="text-sm text-slate-500">
                        © 2024 Career Genie. All rights reserved.
                    </p>
                    <nav className="flex gap-4 text-sm">
                        <a href="#" className="text-slate-500 transition-colors hover:text-indigo-600">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-slate-500 transition-colors hover:text-indigo-600">
                            Terms of Service
                        </a>
                        <a href="#" className="text-slate-500 transition-colors hover:text-indigo-600">
                            Cookie Settings
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export { Footerdemo }
