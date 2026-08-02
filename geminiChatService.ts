import { Plant } from '../types';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedAction?: string;
}

class GeminiChatService {
  /**
   * Generates a context-aware answer for a given user prompt about a specific plant.
   */
  async askBotanistAI(plant: Plant, userPrompt: string): Promise<string> {
    const cleanPrompt = userPrompt.toLowerCase().trim();

    // Simulate network API delay for smooth conversational rhythm (600ms - 1000ms)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Smart contextual rules engine based on plant metadata
    if (cleanPrompt.includes('edible') || cleanPrompt.includes('eat') || cleanPrompt.includes('poison')) {
      const status = plant.edibleStatus || (plant.toxicity.level === 'safe' ? 'Edible' : 'Toxic');
      return `Regarding **${plant.commonName}** (*${plant.scientificName}*):\n\n` +
        `• **Edibility Status**: ${status}\n` +
        `• **Toxicity Details**: ${plant.toxicity.details}\n` +
        (plant.toxicity.affectedPets?.length ? `• **Pet Precaution**: Keep away from ${plant.toxicity.affectedPets.join(' & ')}.` : '• **Pet Safety**: Non-toxic under standard handling.');
    }

    if (cleanPrompt.includes('water') || cleanPrompt.includes('irrigate') || cleanPrompt.includes('dry')) {
      return `**Watering Guidelines for ${plant.commonName}**:\n\n` +
        `💧 **Schedule**: ${plant.care.watering}\n` +
        `🌱 **Soil Preference**: ${plant.care.soil}\n` +
        `💧 **Humidity**: ${plant.care.humidity}\n\n` +
        `*Pro Tip*: Always check the top 2 inches of soil with your finger before adding water to prevent root rot.`;
    }

    if (cleanPrompt.includes('sun') || cleanPrompt.includes('light') || cleanPrompt.includes('shade')) {
      return `**Sunlight Requirements for ${plant.commonName}**:\n\n` +
        `☀️ **Light Needs**: ${plant.care.sunlight}\n` +
        `🌡️ **Ideal Temperature**: ${plant.care.temperature}\n` +
        `🏡 **Habitat**: ${plant.habitat}`;
    }

    if (cleanPrompt.includes('disease') || cleanPrompt.includes('pest') || cleanPrompt.includes('yellow') || cleanPrompt.includes('sick')) {
      return `**Health & Pest Prevention for ${plant.commonName}**:\n\n` +
        `• **Common Pests**: Spider mites, mealybugs, or scale insects under leaf undersides.\n` +
        `• **Yellow Leaves**: Usually caused by overwatering or poor drainage.\n` +
        `• **Brown Leaf Tips**: Often indicates low indoor humidity or tap water fluoride build-up.\n` +
        `• **Treatment**: Wipe leaves with mild neem oil solution or insecticidal soap monthly.`;
    }

    if (cleanPrompt.includes('medicinal') || cleanPrompt.includes('benefit') || cleanPrompt.includes('cure') || cleanPrompt.includes('use')) {
      return `**Medicinal & Traditional Uses of ${plant.commonName}**:\n\n` +
        `🌿 **Key Benefits**:\n` +
        plant.medicinalBenefits.map(b => `• ${b}`).join('\n') +
        `\n\n📜 **Traditional History**:\n` +
        plant.traditionalUses.map(u => `• ${u}`).join('\n');
    }

    if (cleanPrompt.includes('care') || cleanPrompt.includes('grow') || cleanPrompt.includes('fertilize')) {
      return `**Complete Care Profile for ${plant.commonName}**:\n\n` +
        `☀️ **Sunlight**: ${plant.care.sunlight}\n` +
        `💧 **Water**: ${plant.care.watering}\n` +
        `🪴 **Soil**: ${plant.care.soil}\n` +
        `🌡️ **Temp**: ${plant.care.temperature}\n` +
        `🌱 **Growth Period**: ${plant.growthPeriod || 'Active spring/summer growth'}`;
    }

    // Default intelligent botanical answer
    return `**${plant.commonName}** (*${plant.scientificName}*) belongs to the **${plant.botanicalFamily}** family, natively originating from ${plant.nativeRegion}.\n\n` +
      `It thrives best in ${plant.care.sunlight} with ${plant.care.watering}.\n\n` +
      `Is there a specific topic you would like to explore, such as watering frequency, pet safety, or medicinal preparations?`;
  }
}

export const geminiChatService = new GeminiChatService();
