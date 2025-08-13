import { Routes } from '@angular/router';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { isAuthenticated } from '@shared/guards/is-authenticated.guard';
import { WorkspacePageComponent } from './pages/workspace-page/workspace-page.component';


export enum EditorPages {
  WORKSPACE = "workspace",
  NOT_FOUND = "not-found",
}

export const EDITOR_ROUTES: Routes = [
  { path: '', redirectTo: EditorPages.WORKSPACE, pathMatch: 'full' },
  {
    path: EditorPages.WORKSPACE, component: WorkspacePageComponent, title: 'Workspace', canActivate: [isAuthenticated],
    data: { authMode: 'private' }
  },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found' }
];
