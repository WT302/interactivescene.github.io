extends CharacterBody2D

const gravity = 2000
const speed = 350
const jump_velocity = 800

@onready var animation_player = $AnimationPlayer
@onready var sprite: Sprite2D = $Sprite2D

func _physics_process(delta: float) -> void:
	var direction := Input.get_action_strength("move_right") - Input.get_action_strength("move_left")
	velocity.x = direction * speed
	if not is_on_floor():
		velocity.y += gravity * delta
	else:
		velocity.y = 0
	if Input.is_action_just_pressed("jump") and is_on_floor():
		velocity.y = jump_velocity
		print("jump!",velocity.y)
	move_and_slide()
	if not is_on_floor():
		animation_player.play("jump")
	elif direction == 0:
		animation_player.play("idle")
	else:
		animation_player.play("walk")
		sprite.flip_h = direction < 0
			
