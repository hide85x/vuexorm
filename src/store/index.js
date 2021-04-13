import { createStore } from 'vuex'
import VuexOrm from '@vuex-orm/core';
import Item from '../models/Item'
import User from '../models/User'
import Profile from '../models/Profile'

const database= new VuexOrm.Database()
database.register(Item);
database.register(User);
database.register(Profile);

export default createStore({
  plugins:[VuexOrm.install(database)]

})
