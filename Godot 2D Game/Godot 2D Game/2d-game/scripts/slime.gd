extends Area2D

@export var slime_speed : float = -50

func _physics_process(delta: float) -> void:
	position += Vector2(slime_speed, 0) * delta
