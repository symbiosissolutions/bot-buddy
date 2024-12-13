import { z } from "zod";

export const personaSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Please enter a name, it's important!")
    .min(
      3,
      "Oops! Name needs to be at least 3 characters long. Can you add a bit more?",
    )
    .max(
      30,
      "Your name is a bit too long. Try to keep it under 30 characters!",
    ),

  tagline: z
    .string()
    .nonempty("Every character needs a tagline. Add one to bring them to life!")
    .min(10, "Your tagline needs at least 10 characters. Try to make it fun!")
    .max(
      50,
      "Your tagline is getting a bit long! Try to keep it under 50 characters.",
    ),

  greeting: z
    .string()
    .nonempty("Please enter a greeting! It’s your chance to say hello!")
    .min(5, "Your greeting needs at least 5 characters. Say something nice!")
    .max(
      100,
      "Your greeting is a bit long. How about keeping it under 100 characters?",
    ),

  backstory: z
    .string()
    .nonempty("A backstory is important. Please share one with us!")
    .min(
      20,
      "Your backstory should be at least 20 characters. Tell us a bit more!",
    )
    .max(
      400,
      "Your backstory is getting long. Let's keep it under 400 characters!",
    ),

  avatar: z.any().optional(),

  personalityTraits: z
    .array(z.string())
    .min(
      1,
      "Please choose at least one personality trait to help define your persona.",
    )
    .max(
      3,
      "You can select up to 3 personality traits. Try to keep it simple!",
    ),
});

export type PersonaFormData = z.infer<typeof personaSchema>;
