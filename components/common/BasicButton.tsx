'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type ColorNames =
	| 'slate'
	| 'gray'
	| 'zinc'
	| 'neutral'
	| 'stone'
	| 'red'
	| 'orange'
	| 'amber'
	| 'yellow'
	| 'lime'
	| 'green'
	| 'emerald'
	| 'teal'
	| 'cyan'
	| 'sky'
	| 'blue'
	| 'indigo'
	| 'violet'
	| 'purple'
	| 'fuchsia'
	| 'pink'
	| 'rose';

type ColorVariations = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

type BasicButtonProps = {
	name: string;
	color?: ColorNames;
	variations?: ColorVariations;
	dimensions?: { height: number; width: number };
	zIndex?: number;
	additionalClassName?: string;
	onClick: () => void;
};

const BasicButton: React.FC<BasicButtonProps> = ({
	name,
	color = 'blue',
	variations = 500,
	dimensions = { height: 10, width: 28 },
	zIndex = 50,
	additionalClassName = '',
	onClick,
}) => {
	// Dimensions
	const height: number = dimensions.height;
	const width: number = dimensions.width;

	// Button class name
	const buttonClass = `${additionalClassName} w-${width} h-${height} border-2 border-${color}-${variations} text-${color}-${variations} font-medium rounded-lg hover:bg-${color}-${variations} hover:text-white transition-colors duration-300 z-${zIndex}`;

	return (
		<motion.button className={buttonClass} whileTap={{ scale: 0.95 }} onClick={onClick}>
			{name}
		</motion.button>
	);
};

export default BasicButton;
