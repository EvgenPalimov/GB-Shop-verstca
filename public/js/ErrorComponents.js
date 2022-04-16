const error = {
    props: ['error'],
    template: `
        <div v-if="error" class="show-error" >
            <span>Приносим свои извенения!!!</span>
            <span>У нас сбой на серевере!!!</span>
            <span>Скоро всё починят!!!</span>
        </div>
        `
};