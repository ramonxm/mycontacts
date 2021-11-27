import { Routes as Switch, Route } from 'react-router-dom';

import { EditContact, Home, NewContact } from './pages';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/new-contact" element={<NewContact />} />
      <Route path="/edit/:id" element={<EditContact />} />
    </Switch>
  );
}
