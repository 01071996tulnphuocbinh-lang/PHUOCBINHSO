import { NavigationRepository } from "domain/repositories";
import { PhoneNumber } from "domain/value-objects/PhoneNumber";

export class OpenPhoneUseCase {
    constructor(private readonly navigationRepository: NavigationRepository) {}

    execute(rawPhoneNumber: string) {
        const phoneNumber = new PhoneNumber(rawPhoneNumber);
        return this.navigationRepository.openPhone(phoneNumber.toString());
    }
}
