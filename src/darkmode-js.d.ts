declare module "darkmode-js" {
    export interface DarkMode {
        isEnabled: boolean;
        enable(): void;
        disable(): void;
        toggle(): void;
        new(options?: {
            className?: string;
            element?: HTMLElement;
            onChange?: (isEnabled: boolean) => void;
        }): DarkMode;
    }
    export function create(options?: {
        className?: string;
        element?: HTMLElement;
        onChange?: (isEnabled: boolean) => void;
    }): DarkMode;
}