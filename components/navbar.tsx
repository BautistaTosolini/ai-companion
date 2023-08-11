'use client'

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Menu, Sparkles } from "lucide-react";
import { Poppins } from 'next/font/google';
import Link from 'next/link';

import { ModeToggle } from "@/components/mode-toggler";
import { Button } from "@/components/ui/button";
import MobileSidebar from "@/components/mobile-sidebar";

const font = Poppins({ weight: '600', subsets: ['latin'] })

const Navbar = () => {
  return ( 
    <div className='fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16'>
      <div className='flex items-center'>
        <MobileSidebar />
        <Link href='/'>
          <h1 className={cn('hidden md:block text-xl md:text-3xl font-bold text-primary', font.className)}>
            companion.ai
          </h1>
        </Link>
      </div>
      <div className='flex items-center gap-x-3'>
        <Button variant='premium' size='sm'>
          Upgrade
          <Sparkles className='h-4 w-4 fill-white text-white ml-2' />
        </Button>
        <ModeToggle />
        <UserButton afterSignOutUrl='/'/>
      </div>
    </div> 
  );
}
 
export default Navbar;