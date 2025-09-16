import { Routes } from '@angular/router';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { WorkspacePageComponent } from './pages/workspace-page/workspace-page.component';
import { authGuard } from '@shared/guards/auth.guard';


export enum EditorPages {
  WORKSPACE_NEW = "workspace",
  WORKSPACE_EDIT = "workspace/:id",
  NOT_FOUND = "not-found",
}

export const EDITOR_ROUTES: Routes = [
  { path: '', redirectTo: EditorPages.WORKSPACE_NEW, pathMatch: 'full' },
  {
    path: EditorPages.WORKSPACE_NEW, component: WorkspacePageComponent, title: 'Workspace', canActivate: [authGuard('loggedIn')]
  },
  {
    path: EditorPages.WORKSPACE_EDIT, component: WorkspacePageComponent, title: 'Workspace', canActivate: [authGuard('loggedIn')]
  },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found' }
];
