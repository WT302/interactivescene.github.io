extends CharacterBody2D

const gravity = 2000

var my_velocity = Vector2.ZERO

func _physics_process(_delta):
	my_velocity = move_and_slide()

func _process(delta):
	velocity.y += gravity * delta
