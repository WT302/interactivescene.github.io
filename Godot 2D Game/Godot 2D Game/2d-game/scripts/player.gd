extends CharacterBody2D

var move_speed: float = 100
@export var animator : AnimatedSprite2D
var is_game_over : bool = false

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	velocity = 	Input.get_vector("left", "right", "up", "down") * move_speed
	if velocity == Vector2.ZERO: #if speed is 0, play idle animation
		animator.play("dai ji")
	else: #if speed does not = 0, play running animation
		animator.play("run")
	move_and_slide()

func game_over():
	is_game_over = true
	get_tree().reload_current_scene()
