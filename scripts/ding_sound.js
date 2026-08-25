import { world } from "@minecraft/server";

world.afterEvents.projectileHitEntity.subscribe((data) => {
  if (data.source?.typeId === "minecraft:player" && (data.projectile.typeId === "minecraft:arrow" || data.projectile.typeId === "minecraft:fireworks_rocket")) {
    data.source.playSound("random.orb", { volume: 0.4, pitch: 0.5 });
  }
});
