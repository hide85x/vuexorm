import { Model } from '@vuex-orm/core';

export default class List extends Model {
    static entity= 'list'
    static fields() {
        return {
            id: this.attr(null),
            body: this.string('')
        }
    }
}