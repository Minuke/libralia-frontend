import { Routes } from '@angular/router';

export enum FeaturePages {
	AUTH = "auth",
	DASHBOARD = "dashboard",
	EDITOR = "editor",
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
			},
						{
				path: FeaturePages.EDITOR,
				loadChildren: () => import("@features/editor/editor.routes").then((r) => r.EDITOR_ROUTES)
			},
		]
	},
	{
		path: "**",
		redirectTo: FeaturePages.NOT_FOUND,
    title: "Page Not Found",
	}
];
