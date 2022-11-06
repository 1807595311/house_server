module.exports = (u) => {
    if(!u.cover){
        return `UPDATE dynamic SET 
        title='${u.title}',
        content='${u.content}',
        content_md='${u.content_md}',
        tags='${u.tags}'
        where id=${u.id}
        ;`;
    }else{
        return `UPDATE dynamic SET 
        title='${u.title}',
        content='${u.content}',
        content_md='${u.content_md}',
        cover='${u.cover}',
        tags='${u.tags}'
        where id=${u.id}
        ;`;
    }
}