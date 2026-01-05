extends CharacterBody2D

const gravity = 2000
const speed = 350
const jump_force = 800
var my_velocity = Vector2.ZERO
var is_jumping = false

func _physics_process(_delta):
	my_velocity = move_and_slide()
	if is_on_floor():
		is_jumping =false

func _input(event):
	if event.is_action_pressed("jump") and not is_jumping:
		velocity.y = - jump_force
		is_jumping = true

func _process(delta):
	var direction = Input.get_action_strength("move_right") - Input.get_action_strength("move_left")
	velocity.x = direction * speed
	velocity.y += gravity * delta
