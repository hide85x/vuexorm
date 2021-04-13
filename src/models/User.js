import { Model } from '@vuex-orm/core';
import Profile from '../models/Profile'

export default class User extends Model {
    static entity= 'users'
    static fields() {
        return {
            id: this.uid(),
            name: this.string(''),
            email: this.string(''),


            //relations user has one profile
            profile: this.hasOne(Profile, 'user_id')
        }
    }
}