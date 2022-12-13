import { Schema, model, Types } from "mongoose";

const bioSchema = new Schema({
   owner: { type: Types.ObjectId, ref: "User" },
   avatar: { type: String, default: "https://res.cloudinary.com/dpxfwxwfu/image/upload/v1670781257/default-imgs/user__img_default_wz8xpx.png" },
   artistic_name: { type: String, required: true, trim: true },
   bio: { type: String },
   categories: [{
      type: String,
      enum: [
         "Artesanato e decoração",
         "Aventura/ Ação",
         "Bordados, amigurumis e pelúcias",
         "Cerâmicas/Biscuit",
         "Chaveiros, pins e bótons",
         "Comics",
         "Fantasia",
         "Humor",
         "Infantil",
         "LGBTQIA+",
         "Livros",
         "Papelaria e adesivos",
         "Prints e pôsteres",
         "Mistério e terror",
         "Romance",
         "Roupas e acessórios"
      ]
   }],
   key_words: { type: String },
   store_URL: { type: String, required: true },
   twitter_URL: { type: String },
   instagram_URL: { type: String },
   facebook_URL: { type: String },
   tiktok_URL: { type: String },
   youtube_URL: { type: String }
});

export const BioModel = model("Bio", bioSchema);