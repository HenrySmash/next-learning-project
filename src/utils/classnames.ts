import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * custom classnames function for projects with tailwindcss
 * */
export default function classNames(...classes: Array<string | 0 | false | undefined | null>) {
  return clsx(twMerge(classes));
}
