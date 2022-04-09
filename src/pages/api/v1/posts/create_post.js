import Connect_db from '../../../../utils/dbConnect'
import Post from '../models/post/postModel'

Connect_db()

export default async function (req, res) {
    if (!req.body) {
        return res.status(402).json({ message: 'Заполните поля создания статьи!' })
    }

    const postData = await req.body

    if (true) {
        try {
            const post = await new Post({
                title: postData.postTitle,
                body: postData.body,
                bodyPreview: postData.postDescription,
                preview: postData.postDescription,
                author: 'check',
            })

            await post.save()

            return res.status(ResponseStatuses.CREATED).json({ message: 'Пост создан!' })
        } catch (error) {
            console.log(error.message)
            return res.status(ResponseStatuses.BAD_REQUEST).json({ message: 'Не удалось создать нового пользователя!' })
        }
    } else {
        return res.status(ResponseStatuses.BAD_REQUEST).json({ message: 'Введены некорректные данные!' })
    }
}
