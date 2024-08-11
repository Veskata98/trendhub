import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export const ChangeAvatar = () => {
    return (
        <form className="mb-10">
            <Input className="mb-2 w-full" type="file" accept=".jpeg,.jpg,.png,.gif" />
            <Button className="bg-primary-500 w-full text-white py-2 px-4 rounded transition duration-200 ease-in-out hover:bg-primary-600">
                Save
            </Button>
        </form>
    );
};
