import {
    AuthorizeZaloUseCase,
    CheckFollowStatusUseCase,
    CreateFeedbackUseCase,
    CreateWorkScheduleUseCase,
    FollowOAUseCase,
    GetAccessTokenUseCase,
    GetArticlesUseCase,
    GetFeedbacksUseCase,
    GetFeedbackTypesUseCase,
    GetInformationGuidesUseCase,
    GetOrganizationUseCase,
    GetRawZaloUserInfoUseCase,
    GetUserInfoUseCase,
    GetWorkScheduleUseCase,
    GetZaloPhoneNumberUseCase,
    GetZaloSettingUseCase,
    OpenOAChatUseCase,
    OpenPhoneUseCase,
    OpenWebViewUseCase,
    PickImagesUseCase,
    SaveImageUseCase,
    SearchProfilesUseCase,
} from "domain/use-cases";
import {
    AuthRepositoryImpl,
    FeedbackRepositoryImpl,
    InformationGuideRepositoryImpl,
    MediaRepositoryImpl,
    NavigationRepositoryImpl,
    OrganizationRepositoryImpl,
    ProfileRepositoryImpl,
    ScheduleRepositoryImpl,
    ZaloPermissionRepositoryImpl,
} from "infrastructure/repositories";

class ServiceContainer {
    private readonly authRepository = new AuthRepositoryImpl();

    private readonly organizationRepository = new OrganizationRepositoryImpl();

    private readonly feedbackRepository = new FeedbackRepositoryImpl();

    private readonly informationGuideRepository =
        new InformationGuideRepositoryImpl();

    private readonly profileRepository = new ProfileRepositoryImpl();

    private readonly scheduleRepository = new ScheduleRepositoryImpl();

    private readonly mediaRepository = new MediaRepositoryImpl();

    private readonly navigationRepository = new NavigationRepositoryImpl();

    private readonly zaloPermissionRepository =
        new ZaloPermissionRepositoryImpl();

    public readonly getAccessTokenUseCase = new GetAccessTokenUseCase(
        this.authRepository,
    );

    public readonly getUserInfoUseCase = new GetUserInfoUseCase(
        this.authRepository,
    );

    public readonly getOrganizationUseCase = new GetOrganizationUseCase(
        this.organizationRepository,
    );

    public readonly getArticlesUseCase = new GetArticlesUseCase(
        this.organizationRepository,
    );

    public readonly followOAUseCase = new FollowOAUseCase(
        this.organizationRepository,
    );

    public readonly getFeedbacksUseCase = new GetFeedbacksUseCase(
        this.feedbackRepository,
    );

    public readonly getFeedbackTypesUseCase = new GetFeedbackTypesUseCase(
        this.feedbackRepository,
    );

    public readonly createFeedbackUseCase = new CreateFeedbackUseCase(
        this.feedbackRepository,
    );

    public readonly getInformationGuidesUseCase =
        new GetInformationGuidesUseCase(this.informationGuideRepository);

    public readonly searchProfilesUseCase = new SearchProfilesUseCase(
        this.profileRepository,
    );

    public readonly getWorkScheduleUseCase = new GetWorkScheduleUseCase(
        this.scheduleRepository,
    );

    public readonly createWorkScheduleUseCase = new CreateWorkScheduleUseCase(
        this.scheduleRepository,
    );

    public readonly openWebViewUseCase = new OpenWebViewUseCase(
        this.navigationRepository,
    );

    public readonly openOAChatUseCase = new OpenOAChatUseCase(
        this.navigationRepository,
    );

    public readonly openPhoneUseCase = new OpenPhoneUseCase(
        this.navigationRepository,
    );

    public readonly saveImageUseCase = new SaveImageUseCase(
        this.mediaRepository,
    );

    public readonly pickImagesUseCase = new PickImagesUseCase(
        this.mediaRepository,
    );

    public readonly getZaloSettingUseCase = new GetZaloSettingUseCase(
        this.zaloPermissionRepository,
    );

    public readonly authorizeZaloUseCase = new AuthorizeZaloUseCase(
        this.zaloPermissionRepository,
    );

    public readonly getZaloPhoneNumberUseCase = new GetZaloPhoneNumberUseCase(
        this.zaloPermissionRepository,
    );

    public readonly getRawZaloUserInfoUseCase = new GetRawZaloUserInfoUseCase(
        this.zaloPermissionRepository,
    );

    public readonly checkFollowStatusUseCase = new CheckFollowStatusUseCase(
        this.zaloPermissionRepository,
    );
}

export const serviceContainer = new ServiceContainer();
