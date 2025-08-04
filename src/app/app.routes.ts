import { Routes } from '@angular/router';

export enum FeaturePages {
	AUTH = "auth",
	DASHBOARD = "dashboard",
  NOT_FOUND = "not-found",
}

export const routes: Routes = [
  {
		path: "",
		children: [
			{
				path: "",
				pathMatch: "full",
				redirectTo: FeaturePages.AUTH
			},
			{
				path: FeaturePages.AUTH,
				loadChildren: () => import("@features/auth/auth.routes").then((r) => r.AUTH_ROUTES)
			},
			{
				path: FeaturePages.DASHBOARD,
				loadChildren: () => import("@features/dashboard/dashboard.routes").then((r) => r.DASHBOARD_ROUTES)
			}
		]
	},
	{
		path: "**",
		redirectTo: FeaturePages.NOT_FOUND,
    title: "Page Not Found",
	}
];
