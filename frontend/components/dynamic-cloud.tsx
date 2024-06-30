'use client'
import { useTheme} from 'next-themes';
import React, { useEffect, useMemo, useState } from 'react';
import { Cloud, ICloud, renderSimpleIcon, fetchSimpleIcons, SimpleIcon } from 'react-icon-cloud';

export const cloudProps: Omit<ICloud, 'children'> = {
    containerProps: {
        style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingTop: 40,
        },
    },
    options: {
        reverse: true,
        depth: 1,
        wheelZoom: false,
        imageScale: 2,
        activeCursor: "default",
        tooltip: "native",
        initial: [0.1, -0.1],
        clickToFront: 500,
        tooltipDelay: 0,
        outlineColour: "#0000",
        decel: 0.7,
        freezeDecel: true,
        maxSpeed: 0.04,
        minSpeed: 0.02,
        // reverse: true,
        // depth: 1,
        // wheelZoom: false,
        // imageScale: 2,
        // activeCursor: 'default',
        // tooltip: 'native',
        // initial: [0.1, -0.1],
        // clickToFront: 500,
        // tooltipDelay: 0,
        // outlineColour: '#0000',
        // // freezeActive:true,
        // maxSpeed: 0.03,
        // minSpeed: 0.02,
        // dragControl: true,
        // // dragThreshold: 1,
        // // decel: 0.6,
        // decel: 0.7,
        // freezeDecel: true, // Adjusted deceleration factor to slow down quicker
        // // dragControl: true, // Enable drag control
        // dragThreshold: 1, // Increase threshold to reduce drag sensitivity
        // interval: 20, // Adjusted interval for slower updates
        
        // interval: 30, // Adjust to control update frequency
        // freezeDecel: true,
        // maxSpeed: 0.02, // Lower max speed for slower rotation
        // minSpeed: 0.01, // Lower min speed for slower rotation
        // decel: 0.95, // Slightly higher deceleration for smoother slow down
        // dragControl: true, // Enables drag control
        // dragThreshold: 10, // Threshold to start drag
        // interval: 30,
    },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
    const bgHex = theme === 'light' ? '#f3f2ef' : '#080510';
    const fallbackHex = theme === 'light' ? '#6e6e73' : '#ffffff';
    const minContrastRatio = theme === 'dark' ? 2 : 1.2;

    return renderSimpleIcon({
        icon,
        bgHex,
        fallbackHex,
        minContrastRatio,
        size: 42,
        aProps: {
            href: undefined,
            target: undefined,
            rel: undefined,
            onClick: (e: any) => e.preventDefault(),
        },
    });
};

export type DynamicCloudProps = {
    iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud ({ iconSlugs }: DynamicCloudProps) {
    const [data, setData] = useState<IconData | null>(null);
    const { theme } = useTheme();

    useEffect(() => {
        fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
    }, [iconSlugs]);

    const renderedIcons = useMemo(() => {
        if (!data) return null;

        return Object.values(data.simpleIcons).map((icon) => renderCustomIcon(icon, theme));
    }, [data, theme]);

    return <Cloud {...cloudProps}>{renderedIcons}</Cloud>;
};
