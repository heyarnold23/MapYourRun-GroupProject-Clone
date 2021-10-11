from app.models import db, Run


# Adds a demo user, you can add other users here if you want
def seed_runs():
    demo_run = Run(
        start_point="9.4256434,74.285749", end_point = "9.9738574,75", distance=10.0,time=4800, completed=False, runner_id=1
    )
    demo_run2 = Run(
        start_point="50.464664", end_point = "20.45645", distance=9.0,time=5000, completed=False, runner_id=2
    )
    demo_run3 = Run(
        start_point="25.46484", end_point = "10.4964", distance=5.25,time=10000, completed=False, runner_id=3
    )

    db.session.add(demo_run)
    db.session.add(demo_run2)
    db.session.add(demo_run3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_runs():
    db.session.execute('TRUNCATE runs RESTART IDENTITY CASCADE;')
    db.session.commit()
