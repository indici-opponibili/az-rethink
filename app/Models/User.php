<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, Prunable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'username' => 'encrypted'
    ];

    public function achievements(): HasMany{
        return $this->hasMany(Achievement::class);
    }

    public function contentProgress(): HasMany{
        return $this->hasMany(ContentProgress::class);
    }

    public function courseProgress(): HasMany{
        return $this->hasMany(CourseProgress::class);
    }

    public function prunable()
    {
        return static::where('role', 'guest')
            ->where('created_at', '<', now()->subDays(3));
    }
}
