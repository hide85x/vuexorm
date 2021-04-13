import { Model } from '@vuex-orm/core';
import User from '../models/User';

export default class Profile extends Model {
    static entity= 'profiles'
    static fields() {
        return {
            id: this.uid(),
            bio: this.string(''), 
            // myk, jesli gdzies kiedys dostaniemy jako bio 
            //wartosc null to this.string zrobi nam z tego nulla string 'null
            life_goal: this.string(''),
            user_id: this.attr(null),
            
            //relations, one to one, profile to user
            user: this.belongsTo(User, 'user_id')
        }
    }
}