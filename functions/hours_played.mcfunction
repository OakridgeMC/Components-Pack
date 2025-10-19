execute as @e[type=player] unless score @s afk_display matches 1 run scoreboard players add @s ticks 1
scoreboard players add @e[type=player,scores={ticks=71950..}] hours 1
scoreboard players add @e[type=player,scores={ticks=71950..}] ticks -71950