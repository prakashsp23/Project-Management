import React from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-dropdown-selector';

const OPTIONS: Option[] = [
    { label: 'Nextjs', value: 'nextjs' },
    { label: 'React', value: 'react' },
    { label: 'Remix', value: 'remix' },
    { label: 'Vite', value: 'vite' },
    { label: 'Nuxt', value: 'nuxt' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Angular', value: 'angular' },
    { label: 'Ember', value: 'ember' },
    { label: 'Gatsby', value: 'gatsby' },
    { label: 'Astro', value: 'astro' },
];

const MultipleSelectorCreatable = () => {
    return (
        <div className="w-full">
            <MultipleSelector
                defaultOptions={OPTIONS}
                placeholder="Select Frameworks you like or Type something that does not exist in dropdowns..."
                creatable
                emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                    </p>
                }
            />
        </div>
    );
};

export default MultipleSelectorCreatable;
