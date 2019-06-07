import InboxIcon from '@material-ui/icons/Inbox';
import PeopleIcon from '@material-ui/icons/People';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import DeleteIcon from '@material-ui/icons/Delete';
import Unsubscribe from '@material-ui/icons/Unsubscribe';

export const categoriesLabel = [
  { title: 'Inbox', value: 'inbox', icon: InboxIcon },
  { title: 'Social', value: 'social', icon: PeopleIcon },
  { title: 'Promotions', value: 'promo', icon: CardGiftcardIcon },
  { title: 'Spam', value: 'spam', icon: Unsubscribe },
  { title: 'Trash', value: 'trash', icon: DeleteIcon }
];

export const toolbarActionLabels = [
  { title: 'Delete', value: 'trash', icon: DeleteIcon },
  { title: 'Social', value: 'social', icon: PeopleIcon },
  { title: 'Promotions', value: 'promo', icon: CardGiftcardIcon },
  { title: 'Spam', value: 'spam', icon: Unsubscribe }
];
