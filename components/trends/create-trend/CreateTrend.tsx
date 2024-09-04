'use client';

import { useState } from 'react';

import { CreateTrendModal } from './CreateTrendModal';
import { CreateTrendButton } from './CreateTrendButton';

export const CreateTrend = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => {
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    return (
        <div className="hidden md:block">
            <CreateTrendButton onOpen={onOpen} />
            <CreateTrendModal isOpen={isOpen} onClose={onClose} />
        </div>
    );
};
