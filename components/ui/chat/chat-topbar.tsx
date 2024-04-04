import React from 'react'
import { Info } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../hover-card';
export default function ChatTopbar() {
  return (
    <div className="w-full h-12 flex p-4 justify-between items-center border-b">
      <div className="flex-grow flex items-center justify-center gap-2">
        <div className="flex flex-col">
          <span className="font-medium text-xl">Discussion</span>
        </div>
      </div>
      <div>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Info size={20} />
          </HoverCardTrigger>
          <HoverCardContent className="w-auto">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                Some info
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>

  )
}