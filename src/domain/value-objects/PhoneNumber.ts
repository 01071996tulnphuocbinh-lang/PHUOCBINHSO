export class PhoneNumber {
    private readonly value: string;

    constructor(raw: string) {
        const normalized = PhoneNumber.normalize(raw);
        if (!PhoneNumber.isValid(normalized)) {
            throw new Error("Invalid phone number");
        }
        this.value = normalized;
    }

    public static normalize(raw?: string): string {
        return String(raw || "")
            .replace(/[^\d+]/g, "")
            .trim();
    }

    public static isValid(value: string): boolean {
        if (!value) return false;
        return /^\+?\d{3,15}$/.test(value);
    }

    public toString(): string {
        return this.value;
    }
}
