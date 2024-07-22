import { Popover, PopoverContent } from '@nextui-org/react';
import React from 'react';


const FloatingPopover = ({ content, placement = 'bottom', showArrow = false }) => {
    return (
        <div className="flex justify-end p-4 z-0">
            <Popover placement={placement} showArrow={showArrow}>
                <PopoverContent>
                    <div className="px-1 py-2">
                        <div className="text-small font-bold">{content.title}</div>
                        <div className="text-tiny">{content.description}</div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default FloatingPopover;
