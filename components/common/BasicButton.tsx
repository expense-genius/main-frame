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
	theme?: 'primary' | 'secondary' | 'danger';
};

const variantStyles = {
	primary:
		'w-28 h-10 border-2 border-blue-500 text-blue-500 font-medium rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300 z-50',
	secondary:
		'w-28 h-10 border-2 border-gray-800 text-gray-800 font-medium rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-300 z-50',
	danger:
		'w-28 h-10 border-2 border-red-500 text-red-500 font-medium rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-300 z-50',
};

const BasicButton: React.FC<BasicButtonProps> = ({
	name,
	color = 'blue',
	variations = 500,
	dimensions = { height: 10, width: 28 },
	zIndex = 50,
	additionalClassName = '',
	theme,
	onClick,
}) => {
	// Dimensions
	const height: number = dimensions.height;
	const width: number = dimensions.width;

	let buttonClass = '';

	// If theme is provided, use the variant styles
	if (theme) {
		buttonClass = clsx(variantStyles[theme], additionalClassName);
	} else {
		buttonClass = clsx(
			`w-${width}`,
			`h-${height}`,
			'border-2',
			`border-${color}-${variations}`,
			`text-${color}-${variations}`,
			'font-medium',
			'rounded-lg',
			`hover:bg-${color}-${variations}`,
			'hover:text-white',
			'transition-colors',
			'duration-300',
			`z-${zIndex}`,
			additionalClassName
		);
	}

	return (
		<motion.button className={buttonClass} whileTap={{ scale: 0.95 }} onClick={onClick}>
			{name}
		</motion.button>
	);
};

export default BasicButton;
