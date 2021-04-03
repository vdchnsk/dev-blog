export const echo = (res,req) => {
    res.statusCode = 200
    res.setHeader('Content-type','apllication/json')
    res.end(JSON.stringify({
        message: req.query.message ?? "Base message" // ?? - Если нет
    }))
}