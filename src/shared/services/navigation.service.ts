import { NavigationActions, NavigationContainerComponent } from 'react-navigation';

export class NavigationService {
	private navigator: any;

	setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
		this.navigator = navigatorRef;
	}

	public navigate<T>(routeName: string, params?: T): void {
		this.navigator.dispatch(
			NavigationActions.navigate({
				routeName,
				params,
			})
		);
	}
}

export const navigationService = new NavigationService();
