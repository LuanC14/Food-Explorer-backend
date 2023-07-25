module.exports = {
    jwt: {
        secret: process.env.SECRET || "default",
        'expiresIn': "1D"
    }
}