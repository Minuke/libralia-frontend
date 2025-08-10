import { Routes } from '@angular/router';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { isAuthenticated } from '@shared/guards/is-authenticated.guard';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';

export enum EditorTextPages {
  EDITOR = "editor",
  NOT_FOUND = "not-found",
}

export const TEXT_EDITOR_ROUTES: Routes = [
  { path: '', redirectTo: EditorTextPages.EDITOR, pathMatch: 'full' },
  {
    path: EditorTextPages.EDITOR, component: EditorPageComponent, title: 'Editor', canActivate: [isAuthenticated],
    data: { authMode: 'private' }
  },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found' }
];
