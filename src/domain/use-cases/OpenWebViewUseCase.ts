import { NavigationRepository } from "domain/repositories";

export class OpenWebViewUseCase {
    constructor(private readonly navigationRepository: NavigationRepository) {}

    execute(url: string) {
        return this.navigationRepository.openWebView(url);
    }
}
