import yup from 'yup';

const AccountSchema = yup.object({
    email: yup.string().email().min(4).required(),
    password: yup.string().min(6).required(),
    favorites: yup.array(),
    role: yup.string(),
    carbon: yup.number()
});

const AccountUpdateSchema = yup.object({
    email: yup.string().email().min(4),
    password: yup.string().min(6),
    favorites: yup.array(),
    role: yup.string(),
    carbon: yup.number()
});

const FavoritesUpdateSchema = yup.object({
    favorites: yup.array()
});

export {
    AccountSchema,
    AccountUpdateSchema,
    FavoritesUpdateSchema
}