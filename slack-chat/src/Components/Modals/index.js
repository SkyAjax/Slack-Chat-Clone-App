import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';
import TestRename from './TestRename';

const modals = {
  addingChannel: AddChannel,
  removingChannel: RemoveChannel,
  renamingChannel: RenameChannel,
  testRename: TestRename,
};

export default (modalName) => modals[modalName];
